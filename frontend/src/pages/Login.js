import Head from 'next/head'
import Layout, { setTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <Layout home>
      <Head>
        <title>Login</title>
      </Head>
      <section className={utilStyles.headingMd}>

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
  
              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='https://google.com'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </section>

  </Layout>
)

export default LoginForm