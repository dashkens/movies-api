import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found-wrapper'>
            <h1>Oops!</h1>
            <h2>404 - page not found</h2>
            <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable</p>
            <button className='btn-back'><Link to='/'>Go to homepage</Link></button>
        </div>
    )
}
