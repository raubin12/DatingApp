using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); //It just pass the context (web request) to the next middlewares
                //if something wrong happend in the next middleware, error will go up the chain of
                //middleware till here where the error will be catched below. Too, this is the 
                //reason why this middleware should be first on list of the middlewares
            }
            catch (Exception ex)
            {
                _logger.LogError("coucou");
                _logger.LogError(ex, ex.Message); //This will allow to show error in the Terminal/output of developer tool
                _logger.LogError("coucou");

                //Lines below are for writing  the response to show in the browser console
                //according to the current environment
                context.Response.ContentType = "application/json"; 
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() 
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode, "Internal Server Error");

                //This allow field in ApiException class to be wrote in JSON with CamelCase style. So StatusCode is wrote statusCode and not statuscode
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}