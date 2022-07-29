import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [form,setForm] = useState({}); //Form state
  const [currentIndex,setCurrentIndex] = useState(null);  //Holds index of task being currently edited or deleted

  //Some sample todo tasks
  const [tasks,setTasks] = useState([]);
  
  useEffect(()=>{
      //Here comes the api call and the response is set in tasks
      //Some sample to tasks
      setTasks([   
              {title:"Play Video Games",description:"Play Red Dead Redemption 2 today",dueDate:"2022-08-19"},
              {title:"Go to gym",description:"Go to the gym and workout",dueDate:"2022-08-10"},
              {title:"Wish Ram",description:"Wish Ram a very happy birthday",dueDate:"2022-08-02"}
      ]);
  },[]);

  const changeHandler = (event) => {
      setForm({...form,[event.target.name]: event.target.value});  
  }; 

  
  //Takes 2 parameters, the particular model and the background overlay to be displayed
  const displayModal = (modal,overlay) =>{
    document.getElementById(modal).style.display='block';
    document.getElementById(overlay).style.display='block';
  }
  
  //Takes 2 parameters, the particular model and the background overlay to be hidden
  const hideModal = (modal,overlay) =>{
    document.getElementById(modal).style.display='none';
    document.getElementById(overlay).style.display='none';
    reset();
  }

  const addTask = (e) =>{
    e.preventDefault();
    hideModal('addModal','addOverlay');
    setTasks((pre)=>{
      return [...pre,form];
    });

    reset();
  }

  const fetchEdit = (task,index) =>{
    setForm(task);
    setCurrentIndex(index);
    displayModal('editModal','editOverlay')
  }

  const fetchDelete = (index) =>{
    setCurrentIndex(index);
    displayModal('deleteModal','deleteOverlay')
  }

  const editTask = (e) =>{
    e.preventDefault();
    let t = tasks;
    t[currentIndex] = form;

    setTasks(t);
    hideModal('editModal','editOverlay');
    reset();
  }

  const deleteTask = (e) =>{
    e.preventDefault();
    let t = tasks;
    t.splice(currentIndex,1);

    setTasks(t);
    hideModal('deleteModal','deleteOverlay');
    reset();
  }

  //Resets form and index
  const reset = ()=>{
    setForm({});
    setCurrentIndex(null);
  }

  return (
    <>
    <div className="App">
       <div className='container'>
          <div className='container_header'>
              <span id='logo_span'>Latracal Notes Todo</span>
              <button id='addBtn' className='addBtn btn' onClick={()=>displayModal('addModal','addOverlay')}> <i className="fa fa-plus" aria-hidden="true"></i> </button>
          </div>
          <div className='container_body'>
            {
              tasks.map((task,i)=>{
                return <div key={i} className='todo_item'>
                    <div className='todo_item_title'>{task.title}</div>
                    <div className='todo_item_desc'>{task.description}</div>
                    <div className='todo_item_footer'>
                      <span className='todo_item_date'>{task.dueDate}</span>
                      <div><i className="fa fa-pencil" aria-hidden="true" onClick={()=>fetchEdit(task,i)}></i> &nbsp;&nbsp; <i className="fa fa-trash" aria-hidden="true" onClick={()=>fetchDelete(i)}></i> </div>
                    </div>
                </div>
              })
            }
          </div>
       </div>


       <div id="addModal" className="modal">
          <div className="modal-header">
            <div className="closeModal" onClick={()=>hideModal('addModal','addOverlay')}>
                &times;
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={addTask}>
              <div className='form-item'>
                 <label htmlFor="title" className='form-label'>Title</label><br/>
                 <input className='form-input' onChange={changeHandler} value={form.title?form.title:""} type={"text"} name="title" id='title' placeholder='Task Title'/>
              </div>
              <div className='form-item'>
                 <label htmlFor="description" className='form-label'>Description</label><br/>
                 <input className='form-input' onChange={changeHandler} value={form.description?form.description:""} type={"text"} name="description" id='description' placeholder='Describe your task'/>
              </div>
              <div className='form-item'>
                 <label htmlFor="dueDate" className='form-label'>Finish it by</label><br/>
                 <input className='form-input' onChange={changeHandler} value={form.dueDate?form.dueDate:""} type={"date"} name="dueDate" id='dueDate' placeholder='Due Date'/>
              </div>
              <div className='form-item'>
                 <label htmlFor="saveBtn" className='form-label'>&nbsp;</label><br/>
                 <button disabled={!form.title || !form.description}  className='form-input btn' type='submit' name="saveBtn" id='saveBtn'>Save</button>
              </div>
              </form>
          </div>
      </div>
      <div onClick={()=>hideModal('addModal','addOverlay')} id="addOverlay" className="overlay"></div>

      <div id="editModal" className="modal">
          <div className="modal-header">
            <div className="closeModal" onClick={()=>hideModal('editModal','editOverlay')}>
                &times;
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={editTask}>
              <div className='form-item'>
                 <label htmlFor="title" className='form-label'>Title</label><br/>
                 <input className='form-input' onChange={changeHandler} value={form.title?form.title:""} type={"text"} name="title" id='title' placeholder='Task Title'/>
              </div>
              <div className='form-item'>
                 <label htmlFor="description" className='form-label'>Description</label><br/>
                 <input className='form-input' onChange={changeHandler} value={form.description?form.description:""} type={"text"} name="description" id='description' placeholder='Describe your task'/>
              </div>
              <div className='form-item'>
                 <label htmlFor="dueDate" className='form-label'>Finish it by</label><br/>
                 <input className='form-input' onChange={changeHandler} value={form.dueDate?form.dueDate:""} type={"date"} name="dueDate" id='dueDate' placeholder='Due Date'/>
              </div>
              <div className='form-item'>
                 <label htmlFor="editBtn" className='form-label'>&nbsp;</label><br/>
                 <button  disabled={!form.title || !form.description} className='form-input btn' type='submit' name="editBtn" id='editBtn'>Save Changes</button>
              </div>
              </form>
          </div>
      </div>
      <div onClick={()=>hideModal('editModal','editOverlay')} id="editOverlay" className="overlay"></div>

      <div id="deleteModal" className="modal">
          <div className="modal-header">
            <div className="closeModal" onClick={()=>hideModal('deleteModal','deleteOverlay')}>
                &times;
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={deleteTask}>
              <div className='' style={{ textAlign:"center" }}>
                 <label htmlFor="deleteBtn">The item shall be deleted. Are you sure ?</label><br/>
                 <button className='btn' type='submit' name="deleteBtn" id='deleteBtn'>Confirm Delete</button>
              </div>
            </form>
          </div>
      </div>
      <div onClick={()=>hideModal('deleteModal','deleteOverlay')} id="deleteOverlay" className="overlay"></div>

    </div>
    
    </>
  );
}

export default App;
