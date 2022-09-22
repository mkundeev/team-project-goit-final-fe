import s from './UserResources.module.css';

export default function UserResources({ title, array }) {
    return (<>
        <h1 className={s.title}>{title}</h1>
        <div className={s.line} >
            <hr />
         </div>
            <ul className={s.list}>
                {array.map(({text,number,href}) =>
                {
                    return <li key={number} className={s.item}><a href={href} target="_blank" rel="noreferrer" className={s.link}><span className={s.textNumber}>{number}.</span><span className={s.spanText}>{text}</span></a></li>
                })}
        </ul>
    </>
    )
};