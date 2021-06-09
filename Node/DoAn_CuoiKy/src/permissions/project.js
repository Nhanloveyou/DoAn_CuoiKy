const { ROLE } = require('../app/models/user')

function canViewCourse(user, course) {
  return (
    user.role === ROLE.ADMIN 
    // ||
    // course.Id === user.id
  )
}

function scopedCourses(user, courses) {
  if (user.role === ROLE.ADMIN) return courses
  return courses.filter(course => course.userId === user.id)
}

function canDeleteCourse(user, course) {
  return course.userId === user.id
}

module.exports = {
  canViewCourse,
  scopedCourses,
  canDeleteCourse
}