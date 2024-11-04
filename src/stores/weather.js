import { defineStore } from 'pinia'
import axios from 'axios'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
  params: {
    lang: 'ko',
    key: import.meta.env.VITE_WEATHER_KEY,
    unitGroup: 'metric',
  },
})

const ipApi = axios.create({
  baseURL: 'https://api64.ipify.org/?format=json',
})

const cityNameApi = axios.create({
  baseURL: 'https://freeipapi.com/api/json',
})

export const useWeatherStore = defineStore('weather', () => {
  const address = ref('seoul')
  const currentConditions = ref(null)
  const days = ref(null)
  const searchData = ref([])

  const getCurrentWeatherInfo = async () => {
    try {
      const res = await weatherApi.get(address.value)
      currentConditions.value = res.data.currentConditions
      days.value = res.data.days
    } catch (e) {
      alert(e.response?.data ? e.response?.data : e.message)
    }
  }

  const getSearchWeatherInfo = async city => {
    try {
      const res = await weatherApi.get(city)
      const printData = {
        address: res.data.address,
        feelslikemax: res.data.days[0].feelslikemax,
        feelslikemin: res.data.days[0].feelslikemin,
        icon: res.data.currentConditions.icon,
        temp: res.data.currentConditions.temp,
      }

      if (searchData.value.findIndex(v => v.address === res.data.address) === -1) {
        searchData.value.push(printData)
      } else {
        alert('이미 조회한 지역입니다.')
      }
    } catch (e) {
      alert(e.response?.data ? e.response?.data : e.message)
    }
  }

  const getCityName = async () => {
    try {
      const res = await ipApi.get()
      const ip = res.data.ip
      const res2 = await cityNameApi.get('/' + ip)
      address.value = res2.data.cityName
    } catch (e) {
      alert(e.response?.data ? e.response?.data : e.message)
    }
  }

  const hours = computed(() => {
    return days.value?.find(v => v.datetime === dayjs().format('YYYY-MM-DD'))?.hours.filter(v => v.datetime > dayjs().format('HH:mm:ss'))
  })

  const forecast = computed(() => {
    return days.value?.filter(v => v.datetime > dayjs().format('YYYY-MM-DD'))
  })

  return {
    currentConditions,
    address,
    hours,
    forecast,
    searchData,
    getSearchWeatherInfo,
    getCurrentWeatherInfo,
    getCityName,
  }
})
