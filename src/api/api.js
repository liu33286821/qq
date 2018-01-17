import axios from 'axios'
const CarouselUrl = '/api/getCarousel'
export function getCarousel () {
  axios.get(CarouselUrl).then((res) => {
    console.log(res.data)
    return res.data
  }).catch((error) => {
    return error
  })
}
