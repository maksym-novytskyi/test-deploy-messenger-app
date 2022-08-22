import MessageItemComponent from "./MassageItemComponent/MessageItemComponent";
import InputMessageComponent from "./InputMessageComponent/InputMessageComponent";
import onlineStatusImg from './../../../images/onlineStatus.png'
import moment from 'moment-timezone'

import './DialogWindowComponent.scss'
import {useEffect, useRef} from "react";

const DialogWindowComponent = (props) => {
    const {userName, isOnline, img} = props.userActive;
    const {messages, updateMesseges, updateGetMessages} = props;
    const bodyMessages = useRef(null);
    const scroll = () => {
    bodyMessages.current.scrollIntoView({behavior: "smooth"} );
    }
    useEffect(() => {
        scroll();
    })
    const messagesElements = messages.map((m, i) => {
        const formatDate = (mss) => {
            const timeMessage = moment(mss).format("M/DD/YYYY, H:mm A");
            return {timeMessage}
        }
        const  {timeMessage} = formatDate(m.date)
        return <MessageItemComponent key={i}
                                     date={m.date}
                                     time={timeMessage}
                                     messageText={m.text}
                                     userImg={img}
                                     incomingStatus={m.isIncoming}/>
    })
    return (
        <div className={'dialogWindow'}>
            <div className={'dialogWindow__header'}>
                <div className={'dialogWindow__header-companionAvatar'}>
                    <img src={img} alt="picture"/>
                    {isOnline ? <img className={'online'} src={onlineStatusImg} alt="online"/> : null}
                </div>
                <div className={'dialogWindow__header-companionName'}>
                    {userName}
                </div>
            </div>
            <div className={'dialogWindow__body'}>
                <div>{messagesElements}</div>
                <div ref={bodyMessages}></div>
            </div>
            <div className={'dialogWindow__footer'}>
                <InputMessageComponent updateMesseges={updateMesseges} updateGetMessages={updateGetMessages} messages={messages}/>
            </div>
        </div>
    )
}

export default DialogWindowComponent;