import { createStyles, Grid, Theme, withStyles, WithStyles } from '@material-ui/core'
import React from 'react'
import LoginForm from './LoginForm'

interface IMainProps extends WithStyles<typeof styles> {
	auth: any
}

class Main extends React.Component<IMainProps, {}> {
	public render() {
		const { auth } = this.props

		return (
			<Grid container={true} spacing={24} justify="center">
				<Grid item={true} xs={10} md={6} lg={4}>
					<LoginForm onSubmit={auth.login} onLogout={auth.logout} isAuthenticated={auth.isAuthenticated()} />
				</Grid>
			</Grid>
		)
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {},
	})

export default withStyles(styles)(Main)
