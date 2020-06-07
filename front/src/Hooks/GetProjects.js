import React, { useState, useEffect, useContext } from 'react';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetProjects = () => {
   
    const [projectsState, setProjectsState] = useState([]);

    // const [updatePage, setUpdatePage] = useState(true);

    let appContext = useContext(AppContext);

    console.log(appContext)
    // to delete single project
    const deleteSingleProject = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/projects/${id}`);
    }

    useEffect(()=>{
        console.log('in useeffect projects ')
        console.log(appContext)
        console.log(appContext.refreshProjects)
        if (!appContext.state.refreshProjects)return;
        axios.get('http://localhost:5000/projects')
            .then(res=>{
                console.log(res.data);
                setProjectsState(res.data);
            });
        appContext.changeState({ ...appContext.state, refreshProjects:false});
    }, [projectsState])
    // addProject();

    return (projectsState.map((single, index)=> 
        
        <div className={appContext.state.activeProjectNb == index ? 'singleProject singleProjectActive' : 'singleProject'} 
            onClick={() => appContext.changeState(
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

