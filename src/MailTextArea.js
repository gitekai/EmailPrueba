import React from 'react';


function createStartTag(node,start,tag){
  node.innerHTML = `${node.textContent.substring(0,start)}<${tag}>${node.textContent.substring(start)}</${tag}>`;
  return node;
}

function createEndTag(node,start,tag){
  node.innerHTML = `<${tag}>${node.textContent.substring(0,start)}</${tag}>${node.textContent.substring(start)}`;
  return node;
}

function createMiddleTag(node,start,end,tag){
  node.innerHTML = `${node.textContent.substring(0,start)}
<${tag}>${node.textContent.substring(start,end)}</${tag}>${node.textContent.substring(end)}`;
  return node;
}

function wholeNode(node,tag){
  node.innerHTML = `<${tag}>${node.textContent}</${tag}>`;
  return node;
}



class Editor extends React.Component {
  bold = (fontstyle) => {
    const anchor = document.getSelection().anchorNode;
    const anchorOffset = document.getSelection().anchorOffset;
    
    const focus = document.getSelection().focusNode;
    const focusOffset = document.getSelection().focusOffset;
    
    const selection = {
      startPos: -1,
      endPos: -1,
      focus: { node: focus, offset: focusOffset, wasUsed: false},
      anchor: { node: anchor, offset: anchorOffset, wasUsed: false}
    }; 
    
    const area = document.getElementById('area');
    
    let continuesSelection=false;
    let end=false; 
    for(let i=0;i<area.childNodes.length && !end;i++){
      const childNode = area.childNodes.item(i);
      Object.keys(selection)
        .filter( selectionType => !selection[selectionType].wasUsed)
        .forEach((selectionType) => {
          const selectionObj = selection[selectionType];
          if(childNode.contains(selectionObj.node) ){
            if(selection.startPos < 0 && !continuesSelection){
              selection.startPos = selectionObj.offset;
            } else {
              if( selection.endPos < 0 ){
                if(selection.startPos >= 0 && selectionObj.offset < selection.startPos ){
                  selection.endPos = selection.startPos;
                  selection.startPos = selectionObj.offset;
                } else {
                  selection.endPos = selectionObj.offset;
                }
              }
            }
          }

        });
        
          let node; 
          if(selection.startPos >= 0  && selection.endPos >= 0 ){
            end=true; 
            node = createMiddleTag(childNode.cloneNode(true),selection.startPos,selection.endPos,fontstyle);
            area.replaceChild(node,childNode);

            console.log(`construyo todo ...`);
            
          } else if(selection.startPos >= 0 ){
             node = createStartTag(childNode.cloneNode(true),selection.startPos,fontstyle);
             area.replaceChild(node,childNode);

            continuesSelection=true;
            selection.startPos = -1; 

            
          } else if(selection.startPos < 0  && selection.endPos < 0 && continuesSelection ){
            console.log(`whole node`);
            node = wholeNode(childNode);
            area.replaceChild(node,childNode);

          
            
          } else if(selection.endPos >= 0 ){
            node = createEndTag(childNode.cloneNode(true),selection.endPos,fontstyle);
            area.replaceChild(node,childNode);
            end=true;
           
          }
      }

  }
  
 
  
  render(){
    return(
      <div>
      <div 
        id="area"
        style={{backgroundColor:'gray',height:'400px'}}
        contentEditable="true"
        onInput={this.textChange}
      >

      </div>
        <button
        onClick={this.bold.bind(this,'b')}
        >
        Bold
        </button>
         <button
        onClick={this.bold.bind(this,'u')}
        >Underscored
         </button>
        <button
          onClick={this.bold.bind(this,'i')}
        >Italic
          </button>
        </div>
    );
  }
}

export default Editor; 