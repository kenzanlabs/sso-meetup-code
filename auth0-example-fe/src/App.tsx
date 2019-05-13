import { createStyles, CssBaseline, Theme, WithStyles, withStyles } from '@material-ui/core'
import React from 'react'
import './App.css'

import Bootstrap from './components/Bootstrap'

interface IAppProps extends WithStyles<typeof styles> {}

class App extends React.Component<IAppProps, {}> {
	public render() {
		const { classes } = this.props

		return (
			<main className={classes.root}>
				<CssBaseline />
				<Bootstrap />
			</main>
		)
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {},
	})

export default withStyles(styles)(App)
