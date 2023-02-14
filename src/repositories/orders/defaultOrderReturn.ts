export const defaultOrderInclude = {
  address: true,
  user: {
    select: {
      id: true,
      email: true,
      full_name: true,
      phone: true
    }
  },
  invoice: true
}