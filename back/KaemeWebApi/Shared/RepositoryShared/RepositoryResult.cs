using System;

namespace Shared.RepositoryShared
{
    public class RepositoryResult
    {   
        public object Dapper { get; private set; }
        public ERepositoryResultStatus Status { get; private set; }
        public Exception Exception { get; private set; }
        
        private RepositoryResult() {}

        public static RepositoryResult AddException(Exception exception)
        {
            var repositoryResult = new RepositoryResult();
            repositoryResult.Exception = exception;
            repositoryResult.Status = ERepositoryResultStatus.InternalError;
            return repositoryResult;
        }

        public static RepositoryResult AddDapper(object Dapper){

            var repositoryResult = new RepositoryResult();
            repositoryResult.Dapper = Dapper;            
            return repositoryResult;            
        }

        public static RepositoryResult BadRequest(){

            var repositoryResult = new RepositoryResult();                       
            repositoryResult.Status = ERepositoryResultStatus.BadRequest;
            return repositoryResult;            
        }

        public static RepositoryResult BadRequest(object Dapper){

            var repositoryResult = new RepositoryResult();   
            repositoryResult.Dapper = Dapper;                     
            repositoryResult.Status = ERepositoryResultStatus.BadRequest;
            return repositoryResult;            
        }
        
        public static RepositoryResult NotFound()
        {
            var repositoryResult = new RepositoryResult();                       
            repositoryResult.Status = ERepositoryResultStatus.NotFound;
            return repositoryResult;
        }

        public static RepositoryResult Deleted()
        {
            var repositoryResult = new RepositoryResult();                       
            repositoryResult.Status = ERepositoryResultStatus.Deleted;
            return repositoryResult;          
        }

        public RepositoryResult OkResultOrNotFound()
        {
            Status = Dapper != null ?
                ERepositoryResultStatus.Ok : ERepositoryResultStatus.NotFound;
            return this;
        }

        public RepositoryResult OkFileOrNotFound()
        {
            Status = Dapper != null ?
                ERepositoryResultStatus.OkFile : ERepositoryResultStatus.NotFound;
            return this;
        }        

        public RepositoryResult Created()
        {
            Status = ERepositoryResultStatus.Updated;
            return this;
        }

        public RepositoryResult Updated()
        {
            Status = ERepositoryResultStatus.Updated;
            return this;
        }

        public byte[] GetDapperAsByte(){
            return Dapper as byte[];
        }
    }
}