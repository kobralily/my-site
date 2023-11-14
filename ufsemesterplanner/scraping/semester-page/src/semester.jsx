import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './semester.css';
import ClassObj from './classobj.jsx'

const ClassBox = styled.div`
    padding: 2rem;
    flex-grow: 1;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'pink')};

    display: flex;
    overflow: auto;

`;

export default class Semester extends React.Component {
    render() {
        const totalHours = this.props.classes.reduce((acc, classObj) => {
            var numHours = parseInt(classObj.content.hours, 10);
            if(!numHours) {
                numHours = 0;
            } //i did this ALL BY MYSELF
            return acc + numHours
        } , 0);
        //acc is a counter that adds to itself the hours of each classObj in the this.props.classes array.

        return (
            <div className="semesterBox">
                <div className="titleBox">
                    <h1>{this.props.semester.title}</h1>
                    <h2>{totalHours}</h2>
                </div>
                
                <Droppable droppableId={this.props.semester.id} direction="horizontal">
                    {(provided, snapshot) => (
                    <ClassBox 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        //isDraggingOver={snapshot.isDraggingOver}
                    
                    >
                        {this.props.classes.map((classObj, index) => (<ClassObj key={classObj.id} classObj={classObj} index={index} />
                        ))}
                        {provided.placeholder}
                    </ClassBox>
                    )}
                </Droppable>
            </div>
            
        );
    }
}