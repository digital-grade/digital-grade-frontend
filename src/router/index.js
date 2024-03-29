import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// For Auth
import Login from '@/views/Authentication/Login'
import Home from '@/views/Authentication/Home'

// For Dashboard
import Dashboard from '@/views/Dashboard/Dashboard'

// For Teacher
import Teacher from '@/views/Teacher/IndexTeacher'
import FormTeacher from '@/views/Teacher/FormTeacher'

// For Student
import Student from '@/views/Student/IndexStudent'
import FormStudent from '@/views/Student/FormStudent'

// For Course
import Course from '@/views/Course/IndexCourse'
import FormCourse from '@/views/Course/FormCourse'

// For Class
import Class from '@/views/Class/IndexClass'
import FormClass from '@/views/Class/FormClass'
import IndexClassPreviewStudent from '@/views/Class/IndexClassPreviewStudent'
import DetailClassPreviewStudent from '@/views/Class/DetailClassPreviewStudent'

// For School Year
import SchoolYear from '@/views/SchoolYear/IndexSchoolYear'

// For Map API
import IndexMap from '@/views/MapAPI/IndexMap'

// For Schedule
import Schedule from '@/views/Schedule/IndexSchedule'
import FormSchedule from '@/views/Schedule/FormSchedule'
import IndexSchedulePreviewTeacher from '@/views/Schedule/IndexSchedulePreviewTeacher'

// For profile
import Profile from '@/views/Profile/Profile'

// For Grade
import Grade from '@/views/Grade/FormGrade'

Vue.use(VueRouter)

const routes = [
  /** For Auth */
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  /** End For Auth */

  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      /** For Dashboard */
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
      },

      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      /** End For Dashboard */

      /** For Teacher */
      {
        path: '/teacher',
        name: 'Teacher.Index',
        component: Teacher,
        meta: { requiresAuth: true },
      },
      {
        path: '/teacher/create',
        name: 'Teacher.Create',
        component: FormTeacher,
        meta: { requiresAuth: true },
      },
      {
        path: '/teacher/edit/:teacherId',
        name: 'Teacher.Edit',
        component: FormTeacher,
        meta: { requiresAuth: true },
      },
      /** End For Teacher */

      /** For Student */
      {
        path: '/student',
        name: 'Student.Index',
        component: Student,
        meta: { requiresAuth: true },
      },
      {
        path: '/student/create',
        name: 'Student.Create',
        component: FormStudent,
        meta: { requiresAuth: true },
      },
      {
        path: '/student/edit/:studentId',
        name: 'Student.Edit',
        component: FormStudent,
        meta: { requiresAuth: true },
      },
      /** End For Student */

      /** For Course */
      {
        path: '/course',
        name: 'Course.Index',
        component: Course,
        meta: { requiresAuth: true },
      },
      {
        path: '/course/create',
        name: 'Course.Create',
        component: FormCourse,
        meta: { requiresAuth: true },
      },
      {
        path: '/course/edit/:courseId',
        name: 'Course.Edit',
        component: FormCourse,
        meta: { requiresAuth: true },
      },
      /** End For Course */

      /** For Class */
      {
        path: '/class',
        name: 'Class.Index',
        component: Class,
        meta: { requiresAuth: true },
      },
      {
        path: '/class/create',
        name: 'Class.Create',
        component: FormClass,
        meta: { requiresAuth: true },
      },
      {
        path: '/class/edit/:classId',
        name: 'Class.Edit',
        component: FormClass,
        meta: { requiresAuth: true },
      },
      {
        path: '/class/student',
        name: 'Class.Student',
        component: IndexClassPreviewStudent,
        meta: { requiresAuth: true },
      },
      {
        path: '/class/student/:classId',
        name: 'Class.Student.Detail',
        component: DetailClassPreviewStudent,
        meta: { requiresAuth: true },
      },
      /** End For Class */

      /** For School Year */
      {
        path: '/school-year',
        name: 'SchoolYear.Index',
        component: SchoolYear,
      },
      /** End For School Year */

      /** For Map */
      {
        path: '/map',
        name: 'Map.Index',
        component: IndexMap,
      },
      /** End For School Year */

      /** For Schedule */
      {
        path: '/schedule',
        name: 'Schedule.Index',
        component: Schedule,
        meta: { requiresAuth: true },
      },
      {
        path: '/schedule/create',
        name: 'Schedule.Create',
        component: FormSchedule,
        meta: { requiresAuth: true },
      },
      {
        path: '/schedule/edit/:scheduleId',
        name: 'Schedule.Edit',
        component: FormSchedule,
        meta: { requiresAuth: true },
      },
      {
        path: '/schedule/teacher',
        name: 'Schedule.Teacher',
        component: IndexSchedulePreviewTeacher,
        meta: { requiresAuth: true },
      },
      {
        path: '/schedule/teacher/:scheduleId',
        name: 'Schedule.Teacher.Preview',
        component: Grade,
        meta: { requiresAuth: true },
      },
      /** End For Schedule */
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  document.querySelector('html').style.overflow = 'auto'
  let isAuthenticated = store.getters['auth/isLoggedIn']
  // let isAuthenticated = false;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    if (to.matched.some(record => record.meta.redirect)) {
      next({ name: 'Login', query: { redirect: to.path } })
    } else {
      next({ name: 'Login' })
    }
  } else if (
    (to.name === 'Login' || to.name === 'Register') &&
    isAuthenticated
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
