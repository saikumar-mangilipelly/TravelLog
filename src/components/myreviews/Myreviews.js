import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteallreviews, deletereview, getyourreviews } from '../../redux/actions'
import './Myreview.css'
function Myreviews() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let { username, reviewpresent, yourreviews } = useSelector(state => state.loginReducer)
  function reviewbuttonclick(id) {
    dispatch(deletereview(id))
  }
  useEffect(() => {
    dispatch(getyourreviews(username))
  }, [username, yourreviews])

  function deleteall(username) {
    dispatch(deleteallreviews(username))
  }
  if (!reviewpresent) {
    return (
      <div>
        <h2 className="noreviewhead">No Reviews Present</h2>
        <button className="btn btn-primary mt-3 d-block mx-auto" onClick={() => { navigate('/maps') }}>Add Reviews</button>
      </div>
    )
  }
  else {
    return (
      <div className='container'>
        <h3 className="reviewhead">YOUR REVIEWS</h3>
        <div className='d-flex mt-0 justify-content-end me-5'>
        <button className="btn btn-outline-danger" onClick={() => { deleteall(username) }}>Delete All</button>
        </div>
        <div className="row mt-1">
          <div className="d-flex flex-wrap gap-4 justify-content-center mt-2 mb-3">
            {yourreviews.map(yr => (
              yr.reviews.map(r => (
                <div className="card p-3">
                  <img src={r.piclink} alt="" className='card-img-top reviewimg' />
                  <h4 className="card-title mt-1">{r.placename}</h4>
                  <p className="card-text">{r.review}</p>
                  <p>Created by <b>{r.user}</b></p>
                  <button className="btn btn-outline-danger" onClick={() => { reviewbuttonclick(r._id) }}>Delete</button>
                </div>
              )))
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Myreviews
