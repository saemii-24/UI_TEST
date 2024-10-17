
 const ImageCard = ({ imageList }: { imageList: ImageListProps[] }) => {
    return (
      <>
        <div>
          {imageList.map((item: ImageListProps) => (
            <div key={item.id} className='relative'>
              <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:opacity-50 hover:before:bg-gray-600'>
                <Image
                  src={item.webformatURL}
                  alt={item.user}
                  width={500}
                  height={500}
                  className='relative z-0 cursor-pointer'
                />
              </div>
              {
                // 사용자 사진 있는 경우에만 보여줌
                <div className='size-20 rounded-full'>
                  <Image
                    src={item.webformatURL}
                    alt={item.user}
                    width={500}
                    height={500}
                    className='relative z-0 cursor-pointer'
                  />
                </div>
                //타이틀이 있는 경우에만
                <h2>{Item.title}</h2>
                <div>{
                  item.tags.map((item)=>{
                    return <React.Fragment key={item}>
                      <Tag>{item}</Tag>
                    </React.Fragment>
                  })
                  }</div>
  }
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default ImageCard;