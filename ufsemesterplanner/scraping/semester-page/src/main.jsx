import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App.jsx'
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialClassData } from '../../static/pytojs.js';
import Semester from './semester.jsx';


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


console.log(initialClassData);

class App extends React.Component {
  state = initialClassData;

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.semesters[source.droppableId];
    const finish = this.state.semesters[destination.droppableId];

    if(start == finish) {
      const newClassIds = Array.from(start.classIds);
      newClassIds.splice(source.index, 1);
      newClassIds.splice(destination.index, 0, draggableId);

      const newSemester = {
        ...start,
        classIds: newClassIds,
      };

      const newState = {
        ...this.state,
        semesters: {
          ...this.state.semesters,
          [newSemester.id]: newSemester,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startClassIds = Array.from(start.classIds);
    startClassIds.splice(source.index, 1);
    const newStart = {
      ...start,
      classIds: startClassIds,
    };
    
    const finishClassIds = Array.from(finish.classIds);
    finishClassIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      classIds: finishClassIds,
    };

    const newState = {
      ...this.state,
      semesters: {
        ...this.state.semesters,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    console.log("lol")
    this.setState(newState);

  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.semesterOrder.map(semesterId => {
          const semester = this.state.semesters[semesterId];

          const classes = semester.classIds.map(classId => this.state.classes[classId]);

          return <Semester key={semester.id} semester={semester} classes={classes} />;
          })}
      </Container>
    </DragDropContext>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
)
