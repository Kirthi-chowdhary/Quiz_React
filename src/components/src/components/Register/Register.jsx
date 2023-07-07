import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import './Register.css'

function Register() {

  const navigate = useNavigate()

  const [, forceUpdate] = useState({})

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, [])

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [form] = Form.useForm()


  const onFinish = async ()=>{
    
    console.log(inputs)
   
      try {
        const response = await axios.post('http://localhost:3000/api/register', inputs).then((response) => {
          if (response.data) {
          console.log(response)
          navigate("/login")
          }         
          })
      console.log(response.data)
        
        }
      catch (error) {
        console.error('An error occurred during registration:', error)
      }
    
  }

  const validateName = (_, value) => {
    // Custom validation logic for password
    if (value && value.trim() == '') {
      return Promise.reject(' Only Whitespaces not allowed')
    }
    return Promise.resolve()
  }

  const validatePassword = () => {
    // Custom validation logic for password
    const{ password, confirmPassword}= inputs
    console.log(password, confirmPassword)
    if (password  != confirmPassword) {
      return Promise.reject('Password does not match')
    }
    return Promise.resolve() 
  }

  

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }))
    
  }

  
  return (
   <>
   <Form className='registrationForm' form={form} name="horizontal_Registration"  onFinish={onFinish}>
      <h2><b>Registration</b></h2>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            validator: validateName,
          },
        ]}>
         <Input className='registrationInput' value={inputs.name} onChange={handleInputChange} name='name' placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            validator: validateName
          },
        ]}>
         <Input type='email' className='registrationInput' value={inputs.email} onChange={handleInputChange} name='email' placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            validator: validateName
          },
        ]}
      >
        <Input
          className='registrationInput'
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={inputs.password}
          onChange={handleInputChange}
          type="password"
          name='password'
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmpassword"
        rules={[
          {
            required: true,
            message: 'Password does not match!',
            validator: validateName,
            validator: validatePassword,
          },
        ]}
      >
        <Input
          className='registrationInput'
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={inputs.confirmPassword}
          onChange={handleInputChange}
          type="password"
          name='confirmPassword'
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
          className='bg-sky-600'
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Submit
          </Button>
        )}
      </Form.Item>
   </Form>
   </>
  )
}

export default Register