namespace CRUDAjax.Models {
	using System;
	using System.Collections.Generic;
	using System.Configuration;
	using System.Data;
	using System.Data.SqlClient;

	public class EmployeeDb {
		//declare connection string
		readonly string _connectionString = ConfigurationManager.ConnectionStrings["AppConnectionString"].ConnectionString;
		private SqlCommand Cmd { get; set; }
		private SqlConnection Conn { get; set; }
		private const CommandType CmdType = CommandType.StoredProcedure;
		private SqlParameter[] Parameters { get; set; }

		//Return list of all Employees
		public List<Employee> ListAll() {
			return ExecuteReader("SelectEmployee");
		}

		//Method for Adding an Employee
		public int Add(Employee emp) {
			Parameters = new [] {
				new SqlParameter("@Id", emp.EmployeeID),
				new SqlParameter("@Name", emp.Name),
				new SqlParameter("@Age", emp.Age),
				new SqlParameter("@State", emp.State),
				new SqlParameter("@Country", emp.Country),
				new SqlParameter("@Action", "Insert")
			};

			return ExecuteNonQuery("InsertUpdateEmployee", Parameters);
		}

		//Method for Updating Employee record
		public int Update(Employee emp) {
			Parameters = new [] {
				new SqlParameter("@Id", emp.EmployeeID),
				new SqlParameter("@Name", emp.Name),
				new SqlParameter("@Age", emp.Age),
				new SqlParameter("@State", emp.State),
				new SqlParameter("@Country", emp.Country),
				new SqlParameter("@Action", "Update")
			};

			return ExecuteNonQuery("InsertUpdateEmployee", Parameters);
		}

		//Method for Deleting an Employee
		public int Delete(int id) {
			Parameters = new [] {
				new SqlParameter("@Id", id)
			};

			return ExecuteNonQuery("DeleteEmployee", Parameters);
		}

		private int ExecuteNonQuery(string cmdText, SqlParameter[] parameters) {
			int id;
			using (Conn = new SqlConnection(_connectionString)) {
				Conn.Open();

				try {
					Cmd = new SqlCommand(cmdText, Conn) {
						CommandType = CmdType
					};

					Cmd.Parameters.AddRange(parameters);
					id = Cmd.ExecuteNonQuery();

				} catch (Exception ex) {
					throw ex;
				}
			}

			return id;
		}

		private List<Employee> ExecuteReader(string cmdText) {
			var lst = new List<Employee>();

			using (Conn = new SqlConnection(_connectionString)) {
				Conn.Open();
				try {
					Cmd = new SqlCommand(cmdText, Conn) {
						CommandType = CmdType
					};

					var rdr = Cmd.ExecuteReader();

					while (rdr.Read()) {
						lst.Add(new Employee {
							EmployeeID = Convert.ToInt32(rdr["EmployeeId"]),
							Name = rdr["Name"].ToString(),
							Age = Convert.ToInt32(rdr["Age"]),
							State = rdr["State"].ToString(),
							Country = rdr["Country"].ToString()
						});
					}
				} catch (Exception ex) {
					throw ex;
				}

				return lst;
			}
		}
	}
}