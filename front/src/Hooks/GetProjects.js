import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetProjects = () => {
   
    const [projectsState, setProjectsState] = useState([]); // state for projects

    const appContext = useContext(AppContext); // global context

    // to delete single project based on it's id
    const deleteSingleProject = (id) => {
        
        axios.delete(`http://localhost:5000/projects/${id}`)
        .then(()=> appContext.changeState({ ...appContext.state, refreshProjects: true }));

    }

    useEffect(()=>{
        
        axios.get('http://localhost:5000/projects')
            .then(res=> setProjectsState(res.data))
            .catch(err => console.log('error on getting projects ' + err));

        appContext.changeState({ ...appContext.state, refreshProjects:false});

    }, [appContext.state.refreshProjects]); // if refresProject value from appContext is changed refresh the list

    return (projectsState.map((single, index)=> 
        
        <div key={index} className={appContext.state.activeProjectNb == index ? 'singleProject singleProjectActive' : 'singleProject'}  // check current project is active
            onClick={() => appContext.changeState( // onClick change active project
                {
                    ...appContext.state,
                    activeProjectNb: index,
                    activeProjectName: single.name
                }
            )}>
            <div className='projectTitle'>{single.name}</div>
            <div className='deleteSingleProject' onClick={() => deleteSingleProject(single._id)}></div>
        </div>
          
    ))
};

