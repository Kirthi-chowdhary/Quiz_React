import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
   
  })

  const [type, setType]= useState(null)

  const [, forceUpdate] = useState({})

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = async ()=>{
    
    console.log(inputs)
   
      try {
        const response = await axios.post('http://localhost:3000/api/authentication', inputs).then((response) => {
          if (response.data) {
            let user={
              name: response.data.user,
              email: response.data.email,
              type:response.data.type
            }
            setType(response.data.type)
            localStorage.setItem('currentUser', JSON.stringify(user))
            console.log(response.data)
            navigate("/home", { state: { user } })
          }         
          })
         
        }
      catch (error) {
        console.error('An error occurred during Login:', error)
        alert('Please enter correct password or username')
      }
    
  }

  const validatePassword = (_, value) => {
    // Custom validation logic for password
    if (value && value.trim() == '') {
      return Promise.reject(' Only Whitespaces not allowed')
    }
    return Promise.resolve() 
  }

  const validateusername = (_, value) => {
    // Custom validation logic for password
    if (value && value.trim() == '') {
      return Promise.reject(' Only Whitespaces not allowed')
    }
    return Promise.resolve() 
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }))
    
  }

  return (
   
       <>
   
        <body >
        <Form className='loginForm' form={form} name="horizontal_login"  onFinish={onFinish}>
        <h2><b>Login</b></h2>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            validator: validateusername
          },
        ]}
      >
        <Input className='loginInput' name='username' value={inputs.username} onChange={handleInputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            validator: validatePassword
          },
        ]}
      >
        <Input
          className='loginInput'
          prefix={<LockOutlined className="site-form-item-icon" />}
          name='password'
          value={inputs.password}
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
          className=' bg-sky-600'
            type="primary"
            htmlType="submit"
            disabled={
              (!validatePassword &&
              !validateusername)||
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
      click here to
      <Button
      type='link'
      href='/register'>register</Button>
     
    </Form>
        </body>
       </>
    
  );
};
export default Login;