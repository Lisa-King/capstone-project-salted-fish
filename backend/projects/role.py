#!/usr/bin/python3
import yaml

class Role():
    education_list = ['Null', 'Other', 'Bachelor', 'Master', 'PhD']
    skills_list = ['Null'] + yaml.load(open('projects/project.config', 'r', encoding='utf-8').read(), Loader=yaml.FullLoader)['Role']['Skills']

    def __init__(self, project_id, title, amount, skill=[], experience=0, education=0, general_enquiry=''):
        self.project_id = project_id
        self.title = title
        self.amount = amount
        self.skill = skill
        self.experience = experience
        self.education = education
        self.general_enquiry = general_enquiry
        # no input warning
        self.id = -1

    @staticmethod
    def get_object_by_id(conn, role_id):
        query = "SELECT * FROM project_role where ID = " + str(role_id) + ";"
        result = conn.execute(query)
        if result.rowcount == 0:
            return None
        row = result.fetchone()
        query_2 = f"SELECT * FROM role_skill where roleID = {row['ID']};"
        result_2 = conn.execute(query_2)
        skills = []
        experiences = 0
        for j in range(result_2.rowcount):
            row_2 = result_2.fetchone()
            skills.append(row_2['skill'])
            experiences = row_2['experience']
        role = Role(row['projectID'], row['title'], row['amount'], skills, experiences, row['education'], general_enquiry=row['general_enquiry'])
        role.id = row['ID']
        return role

    @staticmethod
    def get_by_id(conn, role_id):
        query = "SELECT * FROM project_role where ID = " + str(role_id) + ";"
        result = conn.execute(query)
        if result.rowcount == 0:
            return None
        row = result.fetchone()
        query_2 = f"SELECT * FROM role_skill where roleID = {row['ID']};"
        result_2 = conn.execute(query_2)
        skills = []
        experiences = 0
        for j in range(result_2.rowcount):
            row_2 = result_2.fetchone()
            skills.append(row_2['skill'])
            experiences = row_2['experience']
        role = Role(row['projectID'], row['title'], row['amount'], skills, experiences, row['education'], general_enquiry=row['general_enquiry'])
        role.id = row['ID']
        return role.info()

    @staticmethod
    def get_text_by_id(conn, role_id):
        query = "SELECT * FROM project_role where ID = " + str(role_id) + ";"
        result = conn.execute(query)
        if result.rowcount == 0:
            return None
        row = result.fetchone()
        query_2 = f"SELECT * FROM role_skill where roleID = {row['ID']};"
        result_2 = conn.execute(query_2)
        skills = []
        experiences = 0
        for j in range(result_2.rowcount):
            row_2 = result_2.fetchone()
            skills.append(row_2['skill'])
            experiences = row_2['experience']
        role = Role(row['projectID'], row['title'], row['amount'], skills, experiences, row['education'], general_enquiry=row['general_enquiry'])
        role.id = row['ID']
        return role.text_info()

    @staticmethod
    # get by one role with one type of skill;
    def get_by_rid_skill(conn, role_id, skill):
        query = "SELECT * FROM project_role, role_skill where ID = " + str(role_id) + " and skill = " + str(skill) + ";"
        result = conn.execute(query)
        if result.rowcount == 0:
            return None
        skills = []
        experiences = 0
        for j in range(result.rowcount):
            row = result.fetchone()
            skills.append(row['skill'])
            experiences = row['experience']
        role = Role(row['projectID'], row['title'], row['amount'], skills, experiences, row['education'], general_enquiry=row['general_enquiry'])
        role.id = row['ID']
        return role.text_info()

    @staticmethod
    def get_by_proj_id(conn, proj_id):
        query = "SELECT * FROM project_role where projectID = " + str(proj_id) + ";"
        result = conn.execute(query)
        roles = []
        if result.rowcount == 0:
            return roles
        for i in range(result.rowcount):
            row = result.fetchone()
            query_2 = f"SELECT * FROM role_skill where roleID = {row['ID']};"
            result_2 = conn.execute(query_2)
            skills = []
            experiences = 0
            for j in range(result_2.rowcount):
                row_2 = result_2.fetchone()
                skills.append(row_2['skill'])
                experiences = row_2['experience']
            role = Role(row['projectID'], row['title'], row['amount'], skills, experiences, row['education'], general_enquiry=row['general_enquiry'])
            role.id = row['ID']
            roles.append(role.info())
        return roles

    @staticmethod
    def get_text_by_proj_id(conn, proj_id):
        query = "SELECT * FROM project_role where projectID = " + str(proj_id) + ";"
        result = conn.execute(query)
        roles = []
        if result.rowcount == 0:
            return roles
        for i in range(result.rowcount):
            row = result.fetchone()
            query_2 = f"SELECT * FROM role_skill where roleID = {row['ID']};"
            result_2 = conn.execute(query_2)
            skills = []
            experiences = 0
            for j in range(result_2.rowcount):
                row_2 = result_2.fetchone()
                skills.append(row_2['skill'])
                experiences = row_2['experience']
            role = Role(row['projectID'], row['title'], row['amount'], skills, experiences, row['education'], general_enquiry=row['general_enquiry'])
            role.id = row['ID']
            roles.append(role.info())
        return role.text_info()

    def info(self):
        return {'id': self.id, 'title': self.title, 'amount': self.amount, 'skill': self.skill, 'experience': self.experience, 'education': self.education, 'general_enquiry': self.general_enquiry, 'project_id': self.project_id}

    def text_info(self):
        return {'id': self.id, 'title': self.title, 'amount': self.amount, 'skill': self.text_skills(), 'experience': self.experience, 'education': self.education_list[self.education], 'general_enquiry': self.general_enquiry, 'project_id': self.project_id}

    def text_skills(self):
        temp_list = []
        for skill in self.skill:
            temp_list.append(self.skills_list[int(skill)])
        return temp_list

    def duplicate_check(self, conn):
        query = "SELECT * FROM project_role where projectID = " + str(self.project_id) + " AND title = \'" + self.title + "\' AND education = " + str(self.education) + ";"
        result = conn.execute(query)
        if result.rowcount > 0:
            return True
        return False

    def create(self, conn):
        if self.duplicate_check(conn):
            return None
        query = "INSERT INTO project_role (projectID, title, amount, education, general_enquiry) VALUES (" + str(self.project_id) + ", \'" + self.title.replace("'", "\\\'") + "\', " + str(self.amount) + ", " + str(self.education) + ", \'" + self.general_enquiry.replace("'", "\\\'") + "\');"
        conn.execute(query)
        query = "SELECT * FROM project_role where projectID = " + str(self.project_id) + " ORDER BY create_time DESC;"
        result = conn.execute(query)
        row = result.fetchone()
        self.id = row['ID']
        for i in range(len(self.skill)):
            query = "INSERT INTO role_skill (skill, experience, roleID) VALUES (" + str(self.skill[i]) + ", " + str(self.experience) + ", " + str(self.id) + ");"
            conn.execute(query)
        return self

    def patch(self, conn):
        #Check project status, no more updates allowed if project is finished;
        query = "SELECT * FROM project WHERE ID = " + str(self.project_id) + ";"
        result = conn.execute(query)
        if result.rowcount == 0:
            return None
        row = result.fetchone()
        if row['status'] != 1:
            return 99 
        query = "UPDATE project_role SET title = \'" + self.title.replace("'", "\\\'") + "\', amount = " + str(self.amount) + ", education = " + str(self.education) + ", general_enquiry = \'" + self.general_enquiry.replace("'", "\\\'") + "\' WHERE ID = " + str(self.id) + ";"
        conn.execute(query)
        # update skills/experience requirement
        if len(self.skill) == 0 or len(self.experience) == 0: # cannot delete requirements and put nothing there - skip if no provided
            return self
        query = f"DELETE FROM role_skill where roleID = {self.id};"
        conn.execute(query)
        for i in range(len(self.skill)):
            query = f"INSERT INTO role_skill (skill, experience, roleID) VALUES ({str(self.skill[i])}, {str(self.experience)}, {str(self.id)});"
            conn.execute(query)
        return self
