import { createStore } from "vuex";
import router from "../router/index";
import axios from 'axios'

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      user: {},
      token: '',
      defaultProfileImg: '',
      //baseUrl: 'http://localhost:8080',
      baseUrl: 'https://my-chat-group.herokuapp.com',
      channelsList: [],
      isLoadingChannels: true,
      isLoadingMembers: true,
      currentChannel: {
        _id: 0,
        name: 'Chat Group',
      },
      currentMembers: [],
      currentMessages: [{
        _id: 0,
        text: 'Join a current channel or start one',
        created_at: String(Date.now()),
        user: {
          name: 'Browser'
        }
      }],
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setDefaultProfileImg(state, imgUrl) {
      state.defaultProfileImg = imgUrl
    },
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
    setLoadingMembers(state) {
      state.isLoadingMembers = true
    },
    setChannelsList(state, channels) {
      state.channelsList = channels
      state.isLoadingChannels = false
    },
    setCurrentMembers(state, members) {
      state.currentMembers = members
      state.isLoadingMembers = false
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
      state.channelsList = [...state.channelsList].filter(ch => ch._id !== channel._id)
    },
    setDefaultMessages(state) {
      state.currentMessages = [
        {
          _id: 0,
          text: 'Join a current channel or start one',
          created_at: String(Date.now()),
          user: {
            name: 'Browser',
          },
        },
      ]
    },
    setDefaultChannel(state) {
      state.currentChannel = {
        _id: 0,
        name: 'Chat Group',
      }
    }
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
    },
    async updateUser({ commit }, payload) {
      commit('setUser', payload)
      localStorage.setItem('user', JSON.stringify(payload))
    }

  }
})

export default store