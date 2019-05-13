import CircularProgress from '@material-ui/core/CircularProgress'
import React, { Component } from 'react'

class Callback extends Component {
	public render() {
		return (
			<div style={{ display: 'flex' }}>
				<CircularProgress style={{ margin: '0 auto' }} />
			</div>
		)
	}
}

export default Callback
