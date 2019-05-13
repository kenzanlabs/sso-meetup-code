import { Avatar, createStyles, Fade, Grid, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { Auth0Error, Auth0UserProfile } from 'auth0-js'
import React from 'react'

interface IProfileProps extends WithStyles<typeof styles> {
	auth: any
}

interface IProfileState {
	profile?: Auth0UserProfile
}

const INITIAL_PROFILE = {}

class Profile extends React.Component<IProfileProps, {}> {
	public readonly state: IProfileState = INITIAL_PROFILE

	public componentWillMount() {
		const { userProfile, fetchProfile } = this.props.auth

		if (!userProfile) {
			fetchProfile((err?: Auth0Error, profile?: Auth0UserProfile) => {
				this.setState({ profile })
			})
		} else {
			this.setState({ profile: userProfile })
		}
	}

	public render() {
		const { classes } = this.props
		const { profile } = this.state

		return (
			<div className={classes.root}>
				{profile && !!Object.keys(profile).length && (
					<Fade in={!!Object.keys(profile).length} timeout={750}>
						<Grid container={true} justify="center" alignItems="center">
							<Avatar alt={profile.name} src={profile.picture} className={classes.avatar} />
							<Typography variant="h5">{profile.nickname}</Typography>
						</Grid>
					</Fade>
				)}
			</div>
		)
	}
}

const styles = (theme: Theme) =>
	createStyles({
		avatar: {
			marginRight: '20px',
		},
		root: {
			padding: '20px 0',
		},
	})

export default withStyles(styles)(Profile)
