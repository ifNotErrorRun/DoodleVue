import axios from 'axios'

export const useAxios = () => {
  const getData = async () => {
    try {
      const response = await axios.get('/api/data')
      console.log(response.data)
    } catch (error) {
      console.error('데이터를 가져오던 중 에러 발생', error)
    }
  }

  const postData = async () => {
    try {
      const response = await axios.post('/api/data', {
        name: 'new data',
        description: 'sample data',
      })
      console.log(response.data)
    } catch (error) {
      console.error('데이터를 추가하던 중 에러 발생:', error)
    }
  }

  const putData = async () => {
    try {
      const response = await axios.put('/api/data/1', {
        name: 'update data',
        description: 'update description',
      })
      console.log(response.data)
    } catch (error) {
      console.error('전체 데이터를 변경하던 중 에러 발생:', error)
    }
  }

  const patchData = async () => {
    try {
      const response = await axios.patch('/api/data/1', {
        description: 'update description',
      })
      console.log(response.data)
    } catch (error) {
      console.error('일부 데이터를 변경하던 중 에러 발생:', error)
    }
  }

  return { getData, postData, putData, patchData }
}
