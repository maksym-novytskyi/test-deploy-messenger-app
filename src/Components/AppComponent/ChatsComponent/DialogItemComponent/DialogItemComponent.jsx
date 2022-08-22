import './DialogItemComponent.scss'
import onlineStatusImg from "../../../../images/onlineStatus.png";

const DialogItemComponent = (props) => {
    const {lastMessageText, date, userName, userImg, openChat, user, isOnline} = props;
    return (
        <div className={'dialogItem'} onClick={() => openChat(user)}>
            <div className={'dialogItem_companionAvatar'}>
                <img src={userImg} alt="avatar"/>
                {isOnline ? <img className={'online'} src={onlineStatusImg} alt="online"/> : null}
            </div>
            <div>
                <div className={'dialogItem__name'}><b>{userName}</b></div>
                <div>{lastMessageText}</div>
            </div>
            <div>
                <b>{date}</b>
            </div>

        </div>
    )
}

export default DialogItemComponent;