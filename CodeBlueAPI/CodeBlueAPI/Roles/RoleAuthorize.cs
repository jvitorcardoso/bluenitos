using Microsoft.AspNetCore.Authorization;
using System;
using System.Linq;

namespace CodeBlue.Roles
{
    public class RoleAuthorize : AuthorizeAttribute
    {
        public RoleAuthorize(params RoleTypes [] rolesArray)
        {
            var roles = rolesArray.Select(x => Enum.GetName(typeof(RoleTypes), x));
            Roles = string.Join(",", roles);
        }
    }
}
