using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user) {
            return user.FindFirst(ClaimTypes.Name)?.Value; //Name represent the UniqueName use inside the TokenService
        }

        public static int GetUserId(this ClaimsPrincipal user) {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value); //NameIdentifier represent the NameId use inside the TokenService
        }
    }
}