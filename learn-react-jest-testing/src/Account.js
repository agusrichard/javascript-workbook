const Account = (props) => {
  console.log('account props', props)

  return (
    <div>
      <p>{props.user.name}</p>
      <p>{props.user.age}</p>
      <p>{props.user.email}</p>
    </div>
  )
}

export default Account