import './MessageItemComponent.scss'

const MessageItemComponent = (props) => {
    const {time, messageText, userImg, incomingStatus} = props;
    const incomingClass = 'messageItemComponent__position-left';
    const outgoingClass = 'messageItemComponent__position-right';
    const messageClass = incomingStatus ? incomingClass : outgoingClass;

    return (
        <div className={messageClass}>
            <div className={'messageItemComponent__position-block'}>
                {!incomingStatus ? null
                : <div className={'messageItemComponent__photo'}>
                        <img src={userImg} alt=""/>
                    </div>}
                <div className={'messageItemComponent__content'}>
                    <div className={'messageItemComponent__content-message'}>{messageText}</div>
                    <div className={'messageItemComponent__content-date'}>{time}</div>
                </div>
            </div>
        </div>
    )
}

export default MessageItemComponent;