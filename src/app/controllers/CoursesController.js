const Course = require('../models/Course');
const { mongoogseToObject } = require('../../util/mongoose');


class CoursesController {
  //[GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(course => {
        //res.json(course)
        res.render('courses/show', { course: mongoogseToObject(course) });
      })
      .catch(next);
  }
  //[GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }
  //[POST] /courses/store
  store(req, res, next) {
    const formData = { ...req.body };
    formData.image = `https://i.ytimg.com/vi_webp/${formData.videoId}/maxresdefault.webp`
    const course = new Course(formData);
    course.save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        course: mongoogseToObject(course)
      }))
      .catch(next);
  }
  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: {$in: req.body.courseIds} })
          .then(() => res.redirect('back'))
          .catch(next);
    }
  }
}

module.exports = new CoursesController();
