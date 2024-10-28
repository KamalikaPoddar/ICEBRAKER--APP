'use server'

import { sql } from '@vercel/postgres'

type UserData = {
  username: string
  mobileNumber: string
  email: string
  pan: string
  aadhaar: string
  classXRollNo: string
  maritalStatus: string
  children: string
  marriageCertificateNumber: string
}

export async function createUser(userData: UserData) {
  try {
    const result = await sql`
      INSERT INTO users (
        username,
        mobile_number,
        email,
        pan,
        aadhaar,
        class_x_roll_no,
        marital_status,
        children,
        marriage_certificate_number
      ) VALUES (
        ${userData.username},
        ${userData.mobileNumber},
        ${userData.email},
        ${userData.pan},
        ${userData.aadhaar},
        ${userData.classXRollNo},
        ${userData.maritalStatus},
        ${userData.children},
        ${userData.marriageCertificateNumber}
      ) RETURNING id
    `

    return { success: true, userId: result.rows[0].id }
  } catch (error) {
    console.error('Failed to create user:', error)
    return { success: false, error: 'Failed to create user' }
  }
}