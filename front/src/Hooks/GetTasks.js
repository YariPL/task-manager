import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetTasks = () => {
    console.log('in hook I am tasks')

    const [tasksState, setTaskState] = useState([]);
    const [openDescr, setOpenDescr] = useState(false);
    const [goodSubTask, setGoodSubTask] = useState({
        name:undefined,
        descr:undefined
    })
    // to delete single tasks
    const deleteSingleTask = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/tasks/${id}`);
    }

    const handleOpenModalClick = (good) => {
        setOpenDescr(true);
        setGoodSubTask({
            name:good.name,
            descr:good.descr
        })
    };

    const handleTitleChange = (e) => {
        console.log('hnadlea wgawgwa')
        console.log(e)
        //tasksState[0].name = e.target.value;
       /*  setTaskState(tasksState)
        console.log(tasksState) */
        
        axios.post(`http://localhost:5000/tasks/edit/${e.single._id}`,
        {
            name: e.name/* ,
            subtasks: e.single.subtasks,
            archived: e.single.archived,
            projectName: e.single.projectName */
        }
        ).then(res => {
                console.log(res.data);
                console.log('ww udaczno')
        }).catch((error) => {
            console.log('rrorroor')
            console.error(error);
        });;

        console.log(tasksState)
    }

    useEffect(() => {

        axios.get('http://localhost:5000/tasks')
            .then(res => {
                console.log(res.data);
                setTaskState(res.data);
            });

            console.log(tasksState)
    }, []);

    useEffect(() => {

        console.log('changed')
        console.log(tasksState)
    }, [tasksState])
    // addProject();

    return (tasksState.map((single, index) =>
        <AppContext.Consumer>
            {value => value.state.activeProjectName === single.projectName ?
                    <div className='singeTask'>
                        <div className='taskTitle'>
                        <input value={single.name} onChange={(e) => handleTitleChange({ single: single, name: e.target.value })} />
                        </div>
                        <div className='taskBody'>
                            {single.subtasks.map((one,index) =>
                                <div key={index} className='singleSubTask'>
                                    <div className='subTaskTitle' onClick={()=>handleOpenModalClick(one)}>
                                        {one.name}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='deleteSingleTask' onClick={() => deleteSingleTask(single._id)}></div>
                        {openDescr ?
                            <div id='singleSubTaskModal'>
                                <div id='singleSubTaskModalTitle'>
                                    {goodSubTask.name}
                                </div>
                                <div id='singleSubTaskModalBody'>
                                    {goodSubTask.descr}
                                </div>
                                <div id='singleSubTaskModalClose' onClick={()=>setOpenDescr(false)}>
                                    close
                                </div>
                            </div>
                            : false
                        }
                    </div>
                :false
            }
        </AppContext.Consumer>
               
    ))
};
