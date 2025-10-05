import style from './style/review.module.sass';

const Review = ( props ) => {
    return (
        <div className={style.reviewCard}>
            <div className={style.reviewContent}>
                <div className='py-0 px-[20px] pb-[30px] pt-[20px]'>
                    <div className='flex place-items-center'>
                        <h2 className='w-[90%] text-2xl font-semibold'>
                            {props.name}
                        </h2>
                        <a className={style.link} href={props.link} target="_blank">
                            <p className={style.telegramIcon} />
                            <p className={style.arrayCornerIcon} />
                        </a>
                    </div>
                    <p className={style.review}>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Review;