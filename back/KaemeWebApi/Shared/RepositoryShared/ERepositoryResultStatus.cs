using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.RepositoryShared
{
    public enum ERepositoryResultStatus
    {        
        Ok,
        OkFile,
        NotFound,
        Created,
        BadRequest,
        Updated,
        Deleted,
        InternalError
    }
}