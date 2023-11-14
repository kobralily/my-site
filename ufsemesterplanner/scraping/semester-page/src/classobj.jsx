import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './classobj.css';

const WholeClass = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0 .3rem 0 .3rem;
        //change color on drag
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};


    width: 200px;
    flex-shrink: 0;

`;

export default class ClassObj extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.classObj.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <WholeClass
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div className='codeHours'>
                            <div className='code'>{this.props.classObj.content.courseCode}</div>
                            <div className='hours'>{this.props.classObj.content.hours}</div>
                        </div>
                        <div>{this.props.classObj.content.courseName}</div>
                    </WholeClass>
                )}

            </Draggable>
        )
    }
}