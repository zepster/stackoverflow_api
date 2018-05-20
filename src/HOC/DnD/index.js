import React from 'react';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow';

const createContext = WrappedComponent => {
  const DragDropContext = props => <DragDropContextProvider backend={HTML5Backend}>
    <WrappedComponent {...props} />
  </DragDropContextProvider>
  return DragDropContext
}

const createDraggableItem = options => WrappedComponent => {
  const cardSource = {
    beginDrag(props) {
      return {
        ...options.beginDrag(props)
      }
    },
  }

  const cardTarget = {
    drop(props, monitor, component) {
      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
  
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
  
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
  
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
  
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
  
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
  
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.moveItem(dragIndex, hoverIndex)
  
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // monitor.getItem().index = hoverIndex
    },
  }

  class DragItem extends React.Component {
    render() {
      const {       
        connectDragSource,
        connectDropTarget
      } = this.props
      return connectDragSource(
        connectDropTarget(<div>{<WrappedComponent {...this.props}/>}</div>)
      )
    }
  }

  return flow(
    DragSource(options.type, cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
    })),
    DropTarget(options.type, cardTarget, connect => ({
      connectDropTarget: connect.dropTarget(),
    })),
  )(DragItem);
}

export {
  createContext,
  createDraggableItem
}
