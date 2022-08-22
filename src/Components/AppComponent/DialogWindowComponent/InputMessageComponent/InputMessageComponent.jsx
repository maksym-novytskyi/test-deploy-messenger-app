import './InputMessageComponent.scss'
import sendImg from '../../../../images/send.png'
import {useState} from "react";
import {nanoid} from "nanoid";
import {useHttp} from "../../../../hooks/http.hook";
import moment from "moment-timezone";


const InputMessageComponent = ({messages, updateMesseges, updateGetMessages}) => {
    const [inputValue, setInputValue] = useState('');
    const {request} = useHttp();

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            messageId: nanoid(),
            date: Number(moment().tz("Europe/Istanbul").format('x')),
            text: inputValue,
            isRead: true,
            isIncoming: false
        }
        sendMessage(newMessage);
        setInputValue('');
        setTimeout(() => {
            request("https://api.chucknorris.io/jokes/random")
                .then(data => {
                    getMessage(data.value, newMessage)
                })
        }, 10000);

    }
    const sendMessage = (message) => {
        updateMesseges(message);
    }

    const getMessage = (textValue, newMessage) => {
        const newGetMessage = {
            messageId: nanoid(),
            date: Number(moment().tz("Europe/Istanbul").format('x')),
            text: textValue,
            isRead: true,
            isIncoming: true
        }
        updateGetMessages(newMessage, newGetMessage)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={'inputMessageComponent'}>
                    <input placeholder={'Write new message..'} type="text" value={inputValue} onChange={handleChange}/>
                    <button disabled={!inputValue} type="submit" value="Отправить"><img src={sendImg}/></button>
                </div>
            </form>
        </div>
    )
}

export default InputMessageComponent;