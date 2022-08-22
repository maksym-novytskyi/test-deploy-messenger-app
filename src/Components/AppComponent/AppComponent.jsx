import ChatsWindowComponent from "./ChatsComponent/ChatsWindowComponent";
import DialogWindowComponent from "./DialogWindowComponent/DialogWindowComponent";
import notificationSound from '../../notificationSound.mp3'

import './AppComponent.scss'
import {useEffect, useRef, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {fetchUsers, usersUpdated} from "../../actions";
import {useDispatch, useSelector} from "react-redux";

const AppComponent = () => {
    const [userActive, setUserActive] = useState();
    const [messages, setMessages] = useState();
    const [term, setTerm] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const audioPlayer = useRef(null);
    const playAudio = () => {
        audioPlayer.current.currentTime = 0;
        audioPlayer.current.play();
    }

    const sortingUsers = (state) => {
        const arrOfDate = state.usersReducer.users.map(el => +el.messages.slice(-1)[0].date);
        const sortDate = arrOfDate.sort((a, b) => b - a);
        const sortUsers = sortDate.map(d => {
            return state.usersReducer.users.filter(u => +u.messages.slice(-1)[0].date === d);
        })
        return searchUsers(sortUsers.flat(), term);
    }

    const searchUsers = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.userName.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }
    const users = useSelector(state => sortingUsers(state));
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchUsers(request));
    }, [request])

    const openChat = (user) => {
        setUserActive(user);
        setMessages(user.messages);
    }

    const updateMessages = (newMessage) => {
        setMessages([...messages, newMessage]);
        userActive.messages = [...messages, newMessage]
        request(`http://maksym-novytskyi.github.io:3001/users/${userActive.id}`, "PUT", JSON.stringify(userActive))
            .then(dispatch(usersUpdated(userActive)))
            .catch(err => console.log(err));
    }
    const updateGetMessages = (newMessage, newGetMessage) => {
        setMessages([...messages, newMessage, newGetMessage]);
        userActive.messages = [...messages, newMessage, newGetMessage]
        request(`http://maksym-novytskyi.github.io:3001/users/${userActive.id}`, "PUT", JSON.stringify(userActive))
            .then(dispatch(usersUpdated(userActive)))
            .catch(err => console.log(err));
        playAudio();
    }
    return (
        <div className={'appComponent'}>
            <audio src={notificationSound} ref={audioPlayer}/>
            <ChatsWindowComponent onUpdateSearch={onUpdateSearch} isOnline={true} openChat={openChat} users={users}/>
            {userActive ? <DialogWindowComponent updateMesseges={updateMessages}
                                                 updateGetMessages={updateGetMessages}
                                                 messages={messages}
                                                 userActive={userActive}/>
                : <div className={'chooseDialog'}><h3>Select a chat to start messaging</h3></div>}
        </div>
    );
}

export default AppComponent;