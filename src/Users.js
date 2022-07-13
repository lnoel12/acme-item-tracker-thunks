import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { user } from 'pg/lib/defaults';
import { createUser,   } from './store';


const Users = ({ users, createUser, deleteUser, things, removeThingFromUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>+</button>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name } ({ user.ranking })
                <button onClick={ ()=> deleteUser(user)}>x</button>
                <button onClick={()=> increment(user, -1)}>-</button>
                <button onClick={()=> increment(user, 1)}>+</button>
                <ul>
                {
                  things.filter( thing => thing.userId === user.id)
                    .map(thing => {
                      return (
                        <li key={ thing.id }>
                          { thing.name } ({ thing.ranking })
                          <button onClick={ ()=> removeThingFromUser(thing)}>x</button>
                        </li>
                      );
                    }) 
                  
                }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}

const mapDispatch = (dispatch)=> {
  return {
    userIncr: async(user, dir)=>{
      user = {... user, ranking: user.ranking +dir};
      user = (await axios.put(`/api/users/${user.id}`, user)).data 
      dispatch({type:'UPDATE_USER', user})
 
    },
    createUser: async()=> {
      dispatch(createUser(user));
      //hint
      //dispatch(createUser({name: Math.random()}));
    },

    removeThingFromUser: async(thing)=> {
      thing = {...thing, userId: null}
      dispatch(removeThingFromUser(user));

    },
    deleteUser: async(user)=> {
      dispatch(deleteUser(user));
    },
  };
}
export default connect(mapStateToProps, mapDispatch)(Users);
