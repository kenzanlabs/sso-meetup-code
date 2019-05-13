import { AppBar, createStyles, Theme, Toolbar, WithStyles, withStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import * as React from 'react'
import { withRouter } from 'react-router'
import { NavLink, RouteComponentProps } from 'react-router-dom'

type IHeaderWithRouter = {} & RouteComponentProps<{}> & WithStyles<typeof styles>

const Header: React.FC<IHeaderWithRouter> = (props) => {
	const { classes } = props

	return (
		<header className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
					<NavLink to="/" className={classes.title}>
						Auth0 Demo
					</NavLink>
				</Toolbar>
			</AppBar>
		</header>
	)
}

const styles = (theme: Theme) =>
	createStyles({
		root: {},
		title: {
			color: red.A200,
			fontWeight: 'bold',
			textDecoration: 'none',
		},
	})

export const StyledHeader = withStyles(styles)(Header)

export default withRouter(StyledHeader)
