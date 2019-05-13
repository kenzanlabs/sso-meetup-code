import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Profile from './Profile'

interface IMainProps extends WithStyles<typeof styles> {
	auth: any
}

class Home extends Component<IMainProps, {}> {
	public render() {
		const { auth, classes } = this.props
		const isAuthenticated = auth.isAuthenticated()

		return (
			<div className={classes.root}>
				{isAuthenticated ? (
					<div>
						<Typography variant="h4" align="center">
							Welcome!
						</Typography>
						<Profile auth={auth} />
					</div>
				) : (
					<Typography align="center" component="h1" variant="h5">
						Your session expired, go <Link to="/">back to login page</Link>
					</Typography>
				)}
			</div>
		)
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
		},
	})

export default withStyles(styles)(Home)
