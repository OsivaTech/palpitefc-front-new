const Title = ({ title }: { title: string }) => {
  return (
    <div className="h-[30px] lg:w-[300px] w-[200px] bg-app-secondary text-app-background flex items-center justify-center font-bold rounded-br-md rounded-tr-md mb-2">
      {title}
    </div>
  )
}

export default Title
