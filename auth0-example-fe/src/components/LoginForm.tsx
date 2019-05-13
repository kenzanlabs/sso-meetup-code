import { Button, createStyles, Paper, Theme, WithStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'

interface ILoginFormProps extends WithStyles<typeof styles> {
	isAuthenticated: boolean
	onLogout: () => void
	onSubmit: () => void
}

class LoginForm extends React.Component<ILoginFormProps, {}> {
	public render() {
		const { classes, isAuthenticated } = this.props

		return (
			<Paper className={classes.root}>
				<form className={classes.form} onSubmit={this.handleFormSubmit}>
					<Typography align="center" component="h1" variant="h5" style={{ padding: '10px 0' }}>
						{isAuthenticated ? 'You are signed in' : 'Please Sign In'}
					</Typography>

					{isAuthenticated && (
						<Typography align="center" component="h1" variant="h5" style={{ padding: '20px 0' }}>
							<Link to="/home">View Profile</Link>
						</Typography>
					)}

					<div className={classes.formActions}>
						{isAuthenticated ? (
							<Button variant="contained" color="secondary" className={classes.logout} onClick={this.handleLogout}>
								Log Out
							</Button>
						) : (
							<Button type="submit" variant="contained" color="primary" className={classes.submit}>
								Log In
							</Button>
						)}
					</div>
				</form>
			</Paper>
		)
	}

	private handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()

		this.props.onSubmit()
	}

	private handleLogout = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		event.preventDefault()
		this.props.onLogout()
	}
}

const styles = (theme: Theme) =>
	createStyles({
		form: {
			padding: `${theme.spacing.unit * 2}px`,
		},
		formActions: {
			display: 'flex',
			justifyContent: 'center',
		},
		logout: {},
		root: {},
		submit: {},
	})

export default withStyles(styles)(LoginForm)
