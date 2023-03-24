import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './Map.css'
import { addreview,getallreviews } from '../../redux/actions'

function Maps() {
  let { username,review,yourreviews} = useSelector(state => state.loginReducer)
  const dispatch=useDispatch()
  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  const [newplace, setnewplace] = useState()
  const [addnewloc, setaddnewloc] = useState()
  const [isnewloc, setisnewloc] = useState(false)
  const [img, setimg] = useState(null)

  const handleclick = (e) => {
    const { lat, lng } = e.latlng
    setnewplace({ lat, lng })
  }

  useEffect(() => {
    dispatch(getallreviews())
  }, [yourreviews])
    
  function handleclosepopup() {
    setnewplace(null)
    reset()
  }

  const onsubmit = async (mapdata) => {    
    reset()
    let lat=isnewloc ? addnewloc.lat : newplace.lat
    let long=isnewloc ? addnewloc.long : newplace.lng
    setisnewloc(false)
    let tempmapdata = Object.assign(mapdata, { "lat": lat, "long": long, "user": username })
    let newmapdata = new FormData()
    newmapdata.append("mapdata", JSON.stringify(tempmapdata))
    newmapdata.append("photo", img)
    dispatch(addreview(newmapdata))
    setnewplace(null)
  }

  function onnewaddclikc(lat, long) {
    setaddnewloc({ lat, long })
    setisnewloc(true)
  }

  const onimageselect = (event) => {
    setimg(event.target.files[0])
  }

  
  return (
    <div>
      <Map
        center={[17.3850, 78.4867]}
        zoom={7}
        maxZoom={15}
        minZoom={3}
        ondblclick={handleclick}
        doubleClickZoom={false}
        zoomControl={false}
      >
        <TileLayer
          noWrap={true}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position='topright' />

        {review.map(p => {
          return (
            <Marker position={p.pin} key={p._id}>
              <Popup position={p.pin} closeOnClick={true} closeButton={true} >
                <div className='carous'>
                  <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                      {p.reviews.map((r, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                          <div className="card">
                            <img src={r.piclink} className="card-img-top" height="250px" alt="..." />
                            <div className="card-body">
                              <h5 className="card-title">{r.placename}</h5>
                              <p className="card-text">{r.review}</p>
                              <span>Created by <b>{r.user}</b></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                  <button className="btn btn-outline-dark w-100" type='button' data-bs-toggle="modal" data-bs-target="#reviewmodal" onClick={() => onnewaddclikc(p.pin[0], p.pin[1])}>Add your review</button>
                </div>
              </Popup>
            </Marker>)
        })}    

        {newplace ? (
          <Popup position={[newplace.lat, newplace.lng]} closeOnClick={true} closeButton={true} onClose={handleclosepopup} >
            <form onSubmit={handleSubmit(onsubmit)} className='reviewform'>
              <h5 className="fw-bold">Upload image</h5>
              <input type="file" className='form-control' {...register("photo", { required: true })} onChange={onimageselect} />
              {errors.photo && (<p className='text-danger'>* image required</p>)}
              <h5 className='fw-bold'>place</h5>
              <input type="text" className='form-control' placeholder='enter place' {...register("placename")} />
              <h5 className='fw-bold'>review</h5>
              <textarea placeholder='give review' className='form-control' {...register("review")} />
              <button type='submit' className='btn btn-outline-dark'>Add review</button>
            </form>
          </Popup>
        ) : <div className="modal fade" id="reviewmodal" tabindex="-1" aria-labelledby="reviewmodallabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="modal-body">
                  <h5 className="fw-bold">Upload image</h5>
                  <input type="file" className="form-control" {...register("photo", { required: true })} onChange={onimageselect} />
                  {errors.photo && (<p className='mt-2 text-danger fs-6 fw-light'>* image required</p>)}
                  <h5 className="fw-bold">Place</h5>
                  <input type="text" className="form-control" placeholder='enter place' {...register("placename")} />
                  <h5 className="fw-bold">review</h5>
                  <textarea placeholder='give review' className="form-control" {...register("review")} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>}
      </Map>
    </div>
  )
}

export default Maps