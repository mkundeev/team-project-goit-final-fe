import s from './UserLiterature.module.css';
export default function UserLiterature({title,array})
{ 
    return (
        <>
            <h1 className={s.title}>{title}</h1>
            <div className={s.line } ><hr /></div>
            
            <ul className={s.list}>
                {array.map(({text,number}) =>
                {
                    return <li key={number} className={s.item}><p className={s.text}><span className={s.textNumber}>{number}.</span>{text}</p></li>
                })}
        </ul>
        </>
    )
}