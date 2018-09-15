namespace CRUDAjax.Controllers {
	using System.Web.Mvc;
	using Models;

	public class HomeController : Controller {
		EmployeeDb _empDb = new EmployeeDb();

		// GET: Home
		public ActionResult Index() {
			return View();
		}

		public JsonResult GetAll() {
			return Json(_empDb.ListAll(), JsonRequestBehavior.AllowGet);
		}

		public JsonResult Add(Employee emp) {
			return Json(_empDb.Add(emp), JsonRequestBehavior.AllowGet);
		}

		public JsonResult GetById(int id) {
			var employee = _empDb.ListAll().Find(x => x.EmployeeID.Equals(id));
			return Json(employee, JsonRequestBehavior.AllowGet);
		}

		public JsonResult Update(Employee emp) {
			return Json(_empDb.Update(emp), JsonRequestBehavior.AllowGet);
		}

		public JsonResult Delete(int id) {
			return Json(_empDb.Delete(id), JsonRequestBehavior.AllowGet);
		}
	}
}