import { createStore } from "vuex";
import router from "../router/index";
import axios from 'axios'

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      user: {},
      token: "",
      //baseUrl: 'http://localhost:8080',
      baseUrl: 'https://my-chat-group.herokuapp.com/',
      channelsList: [],
      currentChannel: {
        _id: 0,
        name: 'Chat Group',
      },
      currentMembers: [],
      currentMessages: [],
    }
  },
  mutations: {
    setCredentials(state, { token, user }) {
      state.isAuthenticated = true
      state.user = user
      state.token = token
    },
    removeCredentials(state) {
      state.isAuthenticated = false
      state.user = {}
      state.token = ''
    },
    setCurrentChannel(state, channel) {
      state.currentChannel = channel
    },
    setChannelsList(state, channels) {
      state.channelsList = channels
    },
    setCurrentMembers(state, members) {
      state.currentMembers = members
    },
    addChannel(state, channel) {
      state.channelsList = [...state.channelsList, channel]
    },
    addMember(state, payload) {
      state.currentMembers.push(payload)
    },
    removeMember(state, member) {
      state.currentMembers = [...state.currentMembers].filter(mem => mem._id !== member._id)
    },
    setCurrentMessages(state, messages) {
      state.currentMessages = messages
    },
    addMessage(state, message) {
      state.currentMessages.unshift(message)
    },
    removeChannel(state, channel) {
      state.channelsList = [...state.channelsList].filter(ch => ch.id !== channel.id)
    },
  },
  actions: {
    async registerWithLocal({ commit, state }, payload) {
      const res = await axios
        .post(state.baseUrl + '/api/users', payload)
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
      if (res && res.data && res.status === 201) {
        commit('setCredentials', res.data)
        localStorage.setItem('token', JSON.stringify(res.data.token))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        router.push({ name: 'home' })
      }
    },
    async loginWithLocal({ commit, state }, payload) {
      const res = await axios
        .post(state.baseUrl + '/api/auth/login', payload)
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
      if (res && res.data && res.status === 200) {
        commit('setCredentials', res.data)
        localStorage.setItem('token', JSON.stringify(res.data.token))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        router.push({ name: 'home' })
      }
    },
    async loginWithGoogle({ commit, state }, payload) {
      const res = await axios
        .post(state.baseUrl + '/api/auth/google', payload)
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
      if (res && res.data && res.status === 200) {
        commit('setCredentials', res.data)
        localStorage.setItem('token', JSON.stringify(res.data.token))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        router.push({ name: 'home' })
      }
    },
    async logout({ commit }) {
      commit('removeCredentials')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push({ name: 'login' })
    }
  }
})

export default store