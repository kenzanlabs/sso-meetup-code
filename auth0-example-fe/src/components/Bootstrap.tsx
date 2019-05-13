import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import React from 'react'
import { Route, Router } from 'react-router'
import history from '../history'

import Auth from '../services/AuthService'
import Callback from './Callback'
import Header from './Header'
import Home from './Home'
import Main from './Main'

interface IBootstrapProps extends WithStyles<typeof styles> {}

const auth = new Auth()

const handleAuthentication = (nextState: any, replace?: any) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication()
	}
}

class Bootstrap extends React.Component<IBootstrapProps, {}> {
	public componentDidMount() {
		const { renewSession } = auth
		const isLoggedIn = localStorage.getItem('isLoggedIn')
		console.log('isLoggedIn: ', isLoggedIn)

		if (isLoggedIn) {
			console.log('isLoggedIn: ', isLoggedIn)
			console.log('isLoggedIn: ', typeof isLoggedIn)

			if (localStorage.getItem('isLoggedIn') === 'true') {
				renewSession()
			}
		}
	}

	public render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<Router history={history}>
					<Header />
					<div className={classes.appContainer}>
						<Route exact={true} path="/" render={(props) => <Main auth={auth} {...props} />} />
						<Route exact={true} path="/home" render={(props) => <Home auth={auth} {...props} />} />
						<Route
							path="/callback"
							render={(props) => {
								handleAuthentication(props)

								return <Callback {...props} />
							}}
						/>
					</div>
				</Router>
			</div>
		)
	}
}

const styles = (theme: Theme) =>
	createStyles({
		appContainer: {
			paddingTop: '50px',
		},
		root: {},
	})

export default withStyles(styles)(Bootstrap)
